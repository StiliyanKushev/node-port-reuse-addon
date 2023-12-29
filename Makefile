# makes a .node file using dotnet 8 aot
node:
	dotnet publish dotnet-src -r linux-x64 -c Release
	cp ./dotnet-src/bin/Release/net8.0/linux-x64/publish/AddonLibrary.node ./node-src/addon.node

# makes a .tgz node addon
addon:
	cd node-src && npm pack

# run jest tests
test:
	cd tests && npm r node-port-reuse-addon
	cd tests && npm i ../node-src/node-port-reuse-addon-1.0.0.tgz && npm i