# Setup
## Hardware
Follow [this guide](https://www.raspberrypi.com/documentation/computers/getting-started.html) to get your raspberry pi started. I opted for Bookworm Lite for my Pi 4 Model B, but any Bookworm installation will work.

Then, take a look at [this](https://projects.raspberrypi.org/en/projects/getting-started-with-picamera/0) to set up your camera (specifically steps 1-3).

## Software
Now that your Pi is properly connected, start it up. Connect to it through whatever method you chose to use in the initial setup.

Note: you may need to run ```sudo apt update``` in order to run some of these commands.

Now, you need to clone this repository.

```
# Download and install git
sudo apt install git

# Clone repository
git clone https://github.com/BK2004/WBC.git
```

Then, cd into your cloned repo, i.e., ```cd <dir>/WBC```.

Now, if you haven't already, you need to install Node 22+. (from [here](https://nodejs.org/en/download))
```
# Download and install curl
sudo apt install curl

# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

# Avoid having to restart shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 22
```

To check whether your installation worked, run
```
node -v # Should output "v22.x.x"
npm -v # Should output "10.x.x"
```

Lastly, install make (or you can just run the commands in Makefile yourself).
```
sudo apt install make
```

## Running the program
Inside of the WBC directory, if you haven't run the program before, use
```make install```
to install required dependencies.

To run the program, run
```make``` and the site will be live at http:&lt;ip&gt;:80, where ip is your Raspberry Pi's IP address.

If you want to get rid of built files, run
```make clean```