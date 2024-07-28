{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv";
  };

  nixConfig = {
    extra-trusted-public-keys =
      "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = { self, nixpkgs, devenv, systems, ... }@inputs:
    let forEachSystem = nixpkgs.lib.genAttrs (import systems);
    in {
      devShells = forEachSystem (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          nodejs-packages = with pkgs.nodePackages; [
            vscode-langservers-extracted
            typescript-language-server
          ];
        in {
          default = devenv.lib.mkShell {
            inherit inputs pkgs;
            modules = [{
              # https://devenv.sh/basics/
              env = { GREET = "🛠️ Let's hack 🧑🏻‍💻"; };

              # https://devenv.sh/reference/options/
              packages = with pkgs;
                [ nodejs_22 nix-output-monitor ] ++ nodejs-packages;

              # https://devenv.sh/scripts/
              scripts.hello.exec = "echo $GREET";

              enterShell = ''
                hello
              '';

              # https://devenv.sh/languages/
              languages.javascript = {
                enable = true;
                pnpm = {
                  enable = true;
                  install.enable = true;
                };
              };
              languages.nix = { enable = true; };
              languages.typescript = { enable = true; };

              # Make diffs fantastic
              difftastic.enable = true;

              # https://devenv.sh/pre-commit-hooks/
              pre-commit.hooks = {
                nixfmt.enable = true;
                nixfmt.package = pkgs.nixfmt-classic;
                yamllint = {
                  enable = true;
                  settings.preset = "relaxed";
                  excludes = [ "pnpm-lock.yaml" ];
                };
                editorconfig-checker.enable = true;
                eslint.enable = true;
                prettier.enable = true;
              };

              # https://devenv.sh/integrations/dotenv/
              dotenv.enable = true;
            }];
          };
        });
      # TODO: https://github.com/NixOS/nixfmt/issues/151
      # https://tonyfinn.com/blog/nix-from-first-principles-flake-edition/nix-4-just-enough-nixlang/
      formatter =
        forEachSystem (system: nixpkgs.legacyPackages.${system}.nixfmt-classic);

    };
}
