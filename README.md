-------------------------------Description-------------------------------------

Glasgow Caledonian University, Year 3 Computing: Web Development 2, Assessment 2.

This project is made for Coursework 2 of Web development. The aim of the project was to make a website that would represent the website of a restaurant, using the following technologies:

Node.Js, Express, and NeDB. 

The full list of used libraries can be found in the package.json file. 

The website contains 4 pages that regular visitors can view, which are a Lunch menu page and a Dinner menu page detailing the dishes served for dinner and lunch, A contact page with contact information, and an About page detailing the website goal and a google maps tool that will show the location of the restaurant.

This differs from the original design, where the menus were selectable from the navbar in submenus, however here they can be selected just by clicking Dinner or Lunch on the nav menu. This change has been made to increase clarity. 

The menus unfortunately do not have images that can be uploaded with them, as after scouring both the NeDB github manuals and stackoverflow, there doesn't seem to be a way to do it. For image functionalities, MongoDB is recommended:
Here is another project to showcase this:

    https://github.com/Fasteddie830/ITP3V2

The About Us in the navbar is moved to the last entry in the nav, for familiarity's sake. 

The login and account pages from the navbar have been removed, for security purposes, as to not advertise to normal users that this function even existst. 

To fill up the website and the navbar with content, the menus were split into separate pages, and a contact page was added.

Additional pages include a staff portal, accessible by entering a specific link. This is to increase security by not naming the link to something easily recognisable.

This page contains a registration and a login function, where official users can log in or register.

After logging in to the website, additional functions will be visible on the menu page itself, instead of in an account page. The account page was scrapped due to the lack of purpose, instead functionalities were implemented to the menus. 

-------------------------------Description End---------------------------------

-------------------------------How To use--------------------------------------

The regular visitor can access the website through the normal link, and all the other pages can be accessed through the NAV part of the page (Top row).

The admin page can be accessed through pasting this link in the url.:

    /JGyyx5Eyj3 

 From there the registration and login pages can be accessed. After registration / login, the admin users can now edit the menus, by going to the Dinner or Lunch menu page. 

There are options to update the current dishes, 
remove the current dishes, 
make dishes available or unavailable, 
to move a dish from one menu to another, 
and to create new dishes. 

After the admin user has finished, they can logout using the button in the navbar, then they would be able to see what normal visitors can see on the lunch / dinner pages. 

Editing other functionalities like contact information or the about page from on-site was not requested, as so it is not implemented, but can be done so in the future. 

-----------------------------How to use locally--------------------------------

Download Visual Studio Code.

To run the website locally, download the github repository containing this website to any folder. Open the main folder of this website in VS Code. From here, open a new terminal in VS Code from Terminal->New Terminal. From there, run the following commands:

    npm init

    npm install express

    npm install nodejs

This step is only required if the website doesn't start.

To start the website, run the command:

    node index.js

The website will then open on 

    http://localhost:5000/

Type this URL into preferrably a chromium based browser. The rest of the process is the same as in the How to Use section.

-----------------------------------End------------------------------------------
