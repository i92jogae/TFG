let
  expressAPI = builtins.importPath "expressAPI";
  reactapp = builtins.importPath "reactapp";
in
  {
    deps = [
      expressAPI
      reactapp
    ];
    shellHook = ''
      npm install
      npm run build
    '';
  }
