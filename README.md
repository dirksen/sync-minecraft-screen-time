# Enforce `Screen Time` upon Minecraft on Mac

This is an OSX automation script that allows parents to police how long the kids can play Minecraft on a Mac via Apple's `Screen Time` policy. When time is up, the game will be frozen. After approval from the parents, the game will resume.

## Why

My kids love playing Minecraft on their Macs. The problem is I cannot control how much time they can play the game via `Screen Time`.  The latter is Apple's solution for parental control. Unfortunately, Mojang only releases the Java version of Minecraft for Mac. Not being a native app, the game does not observe any `Screen Time` policy, hence my wish to find a solution to extend the cover of the `Screen Time` policy over to the game.

## Set up

- Launch the Minecraft Launcher app
- Right-click the app's icon => Options => Keep in Dock
- Download the repo
- Open the `Terminal` app
- Go to the repo folder in `Terminal`
- Type `make`
- You will be prompted to allow `osascript` to control the computer

You shall be all set.

## Uninstall

- In `Terminal`, type `make uninstall`
- Delete this folder.

## Inspiration

The same wish is shared by many anxiety-stricken parents. Someone did find a [solution](https://bugs.mojang.com/browse/MCL-14705) and implement it in [AppleScript](https://bugs.mojang.com/secure/attachment/400412/400412_minetime.txt). It exploits the fact that Minecraft on Mac comes with a `launcher` app. The function of this app is to launch the Java game. Since it's a native app, it abides by the screen time policy. The thinking of the solution is to monitor the launcher app for
its screen time status. When the `launcher` app times out, it kills the Java game.

There are two flaws in this solution:

1. The trigger point for the monitor is at the Java runtime for each Minecraft World. The parents need to rig that configuration to trigger the monitor when launching that world. If the kid downloads a new world and the parent is not aware of it, the kid can play that world non-stop.
2. A tech-savvy kid can easily break the curse by killing the monitor process

I build this solution to address these two problems.
