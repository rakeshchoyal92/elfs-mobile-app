#!/bin/bash
declare -a simulators=("2F0A4F6D-1A89-46AC-839B-0382D674EB48" "A8BB9E20-389E-4B00-B9D8-2A3379F132C3" "D4CAD60C-3C8B-4824-AAE1-01DDFB0FCFFE")

for i in "${simulators[@]}"
do
#    xcrun instruments -w $i
    xcrun xcrun xctrace -w $i
    xcrun simctl install $i ~/.expo/ios-simulator-app-cache/Exponent-2.17.4.tar.app
    xcrun simctl openurl $i exp://127.0.0.1:19000
done
