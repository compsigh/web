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
        nodejs = pkgs.nodejs_22;
        pnpm = pkgs.nodePackages.pnpm;
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            nodejs
            pnpm
          ];
        };

        packages.default = pkgs.stdenv.mkDerivation {
          name = "compsigh-web";
          src = ./.;
          
          buildInputs = [
            nodejs
            pnpm
          ];

          buildPhase = ''
            pnpm install --frozen-lockfile
            pnpm build
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
