In a larger project that has many dependencies, managing all these dependencies becomes a lot of work!
You have to download the files, put them in the right place, and update them when new versions are released.
This is where package managers like npm come in. They automate the process of managing dependencies.  
A simple `npm install` is all that is needed up update all the dependencies.

Another disadvantage of managing dependencies manually is that it can result in many JS files being requested by the browser. Bundlers like Vite, Webpack, etc. can be used to package all necessary JS code into a single JS file used by your appplication, reducing the number of requests made to load the project.

Bundlers also usually provide 'development server' functionality (similar to the Live Server VS Code extension) that can be used to serve the application while working on it, and automatically refresh when files change.