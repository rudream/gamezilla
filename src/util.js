//Media Resize
export const smallImage = (imagePath, size) => {
    let image =
        //default image
        "https://sm.pcmag.com/t/pcmag_in/opinion/6/6-reasons-/6-reasons-pc-gaming-is-better-than-console-gaming_ww5m.1920.jpg";
    if (imagePath) {
        image = imagePath.match(/media\/screenshots/)
            ? imagePath.replace(
                  "media/screenshots/",
                  `media/resize/${size}/-/screenshots/`
              )
            : imagePath.replace(
                  "/media/games/",
                  `/media/resize/${size}/-/games/`
              );
    }
    return image;
};
