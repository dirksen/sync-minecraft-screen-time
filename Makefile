install:
	mkdir -p ~/Library/LaunchAgents/
	sed "s|PWD|$(CURDIR)|g" minecraftSyncScreenTime.plist.tpl > ~/Library/LaunchAgents/minecraftSyncScreenTime.plist
	launchctl unload -w ~/Library/LaunchAgents/minecraftSyncScreenTime.plist
	launchctl load -w ~/Library/LaunchAgents/minecraftSyncScreenTime.plist
uninstall:
	launchctl unload -w ~/Library/LaunchAgents/minecraftSyncScreenTime.plist
