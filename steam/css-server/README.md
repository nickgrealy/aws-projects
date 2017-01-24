## Steam > Counter-Strike: Source

### Windows Dedicated Server setup

**Installation / Updating / Running a Server**

1. Download and unzip [https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip](https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip) (link is legit, it's referenced [here on Valve's instructions](https://developer.valvesoftware.com/wiki/SteamCMD#Windows)) to the Steam home directory (e.g. `C:\Program Files (x86)\Steam\steamapps\common\steamcmd`)
2. Execute the `install_update_run_server.bat` batch script (below). It will download and install the server, then run the server in a new window on port `27015`.
3. You can now connect to your server, it will be listed under the `LAN` tab in-game.
4. Closing the new window, will stop the server.
 
If you want to install a different server, use an AppId (other than `232330`) from the [Dedicated Servers List](https://developer.valvesoftware.com/wiki/Dedicated_Servers_List).

If you want to setup up bots (AI players), add the below `server.cfg` file to the `C:\Program Files (x86)\Steam\steamapps\common\css_server\cstrike\cfg\` directory. Update it, and restart your server for changes to take effect - there are plenty more config options documented on forums and youtube videos. Other config files can be modified in this directory, simply remove the `_default` suffix for files to take effect.


**Port Forwarding**

I haven't covered port forwarding (i.e. allowing internet users to connect through your firewall). It's pretty straight forward and there are many online resources to find out how to perform this. For reference, I use the following ports - `UDP 1200`, `TCP/UDP 25000 - 25039`.

**Rcon**

From inside the game, once connected to the server, you can open the console <kbd>`</kbd> and type the following to connect and run commands on the server.

```
rcon_password password123
```

Now you can [issue commands](http://css.gamebanana.com/threads/118708) to the server. For example:

```
rcon bot_quota 20
rcon bot_kill
```

**See Also**

- https://developer.valvesoftware.com/wiki/SteamCMD
- https://developer.valvesoftware.com/wiki/Dedicated_Servers_List