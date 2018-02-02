# MergeLottie
script to merge all lottie animations in one big json

## Dependencies
nodejs with packages copy and jsonfile (run `npm install` to get them)

## How tu use
1. Put all your lottie's folder animation in animations main folder
2. Run `node merge.js` in the root folder of the project
3. Get the merged json and images in mergelotties folder

## Note
Depending on where you are going to put the merged animations you could want to change the path of images wrote in the merged json. To do that change the variable [onlineurl](https://github.com/BondeVisite/MergeLottie/blob/master/merge.js#L11) in [merge.js](https://github.com/BondeVisite/MergeLottie/blob/master/merge.js) file
