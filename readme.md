Step 1: Proof of concept
  Does our proposed "mushup" seem feasible?
    Yes, after inspecting environment canada, i was surprised that there is no restfulAPI that I can use, regardless through they had an RSS feed that I can call and parse through for weather data. As for Google maps, I just generated the API key and due to previous experience with gMaps I find the mushup to be quite feasible

  Briefly describe the key pieces of functionality that we'd need in the final product
    1. a map that centers in BC
    2. a DB that hold the desired cities
    3. The ability to parse through RSS feeds
    4. The ability to show data from the RSS feed onto the google maps
    5. A simple custom marker for the map to not impede on visibility

  Briefly describe the tools, technologies and platforms that you plan on using for your proof of concept.
    1. MeteorJS will be our primary nodejs stack for both frontend and backend.
    2. MongoDB will be our primary database
    3. open sourced libraries such as
          * dburles:google-maps    -- a wrapper for google maps API to work with meteor
          * anonyfox:scrape        -- used to parse through RSS feed in a simple manner
          * percolate:synced-cron  -- used to create cron jobs

  Would the tools, technologies and platforms that you would use for your proof of concept be appropriate to use in production? What
  limitations might they have?
    Yes, MeteorJs has proved time over time that it is reliable in a production settings. Especially when wrapped into a docker container and published on elastic beanstalk on AWS.

    Only thing I am concerned about is the library "Scrape" that is used to parse through the RSS feed, I would have to go over the code and ensure that its in good shape as I am using it for the first time.

  Briefly describe how you would evaluate each "key piece of functionality" above.

  Estimate how far you think you could get in your proof of concept in the allotted time.
    Within the allocated time I will be able to reach the core functionalities.
    More time would ensure further testing on the code functionality and integrity and ensure that its ready for a production environment.
    I would also be able to put more checks and balances.


Step 2: Implementation
  Shortcuts:
    1. using package: "autopublish" that publishes all DB content to client (for prototyping only)
    2. Not using a setting.json file to hide the google maps API key

Step 3: Feedback
  What architecture and design changes would you make for the project to move from prototype to production?
    1. Security, Security, Security! Ensure all the shortcuts are dealt with
    2. Contain the code in a docker container and publish on elastic beanstalk.
    3. Create a separate DB instance with a more secure structure (at the moment, both DB and NodeJS app reside on the same server)
    4. SSL encrypt the site and the DB using LetsEncrypt
    5. Add a simple interface to control access to the DB (ie. a form that adds/edits/removes cities)
    6. Create roles (admin, viewer, etc.)
    7. Hide the page behind a login window to ensure the code can be accessed by authorized users only

  How would you make the code more maintainable if the project were to move from prototype to production?
    1. Create a Github repo for the code (multi branched : production, staging, feature1, feature2, etc.)
    2. Add automated testing and implement continuous integration for the code  
    3. Use github to keep track of issues
