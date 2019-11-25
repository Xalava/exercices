geth --datadir "." --identity "node01" --syncmode 'full' --networkid "4224" --port "30303" --rpc --rpcaddr 'localhost' --rpcport "8545" --rpcapi 'personal,db,eth,net,web3,txpool,miner,clique,admin' --rpccorsdomain "*" --nat "any" --nodiscover --mine  --gasprice '0'  --allow-insecure-unlock --unlock '0x0f051d0659a1bee7acdbf2abb09e01e510e51832' --password ./pwd.txt