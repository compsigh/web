{
  description = "compsigh web platform";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        nodejs = pkgs.nodejs_24;
        bun = pkgs.bun;
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            nodejs
            bun
          ];
        };

        packages.default = pkgs.stdenv.mkDerivation {
          name = "compsigh-web";
          src = ./.;
          
          buildInputs = [
            nodejs
            bun
          ];

          buildPhase = ''
            bun install --frozen-lockfile
            bun run build
          '';

          installPhase = ''
            mkdir -p $out
            cp -r .next $out/
            cp -r public $out/
          '';
        };
      }
    );
}
