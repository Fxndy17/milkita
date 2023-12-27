{ pkgs }: {
    deps = [
        pkgs.nodejs_20
        pkgs.jellyfin-ffmpeg
        pkgs.git
        pkgs.speedtest-cli
        pkgs.imagemagick
    ];
    env = {
        LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
            pkgs.libuuid
        ];
    };
}