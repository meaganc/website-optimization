## Website Performance Optimization portfolio project

Navigate to the views/pizza.html and confirm via the Chrome dev tools that the pizzas are properly rendered and are at an acceptable FPS. In order to effectively test the site with Google PageSpeed Insights, the site must be available to the wider internet. The site can be accessed at [website optimization] (https://meaganc.github.io/website-optimization/)

### Changes Made to Optimize
* Index.html
    * Async Javascript
    ```
    <script async src="http://www.google-analytics.com/analytics.js"></script>
    ```
    * Utilized the information from [this](http://keithclark.co.uk/articles/loading-css-without-blocking-render/) blog post to asynchronously load CSS. This produced a very significant impact on the Index FPS score.
    ```
    <link href="css/style.css" rel="stylesheet" media="none" onload="if(media!='all')media='all'">
    ```
    * Webfonts were left as is, as they did not make a significant impact on the FPS score. However, we could save them locally.
* Main.js
  * The main bottleneck was the creation of the pizzas and the resizing of the pizzas.
    * For creating the pizzas, I reduced the number of pizzas created
    * When the images are scrolled, the image movement only changes every two frames rather than every frame. This significantly cut down on the FPS required.
    * Switching from using
    ```
    items[i].style.left = ...;
    ```
    to
    ```
    items[i].style.transform = ...;
    ```
    was one of the most significant changes in terms of FPS. Changing the left property requires the [Layout operation](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/), which is much more browser-intensive. To compensate for this, I increased the number of columns on the moving pizzas to 12.
    ```
    <div id="movingPizzas1" class="col-md-12"></div>
    ```
    * Switched
    ```
    document.querySelector("#pizzaSize").innerHTML = 'pizza-size-options';
    ```
    to
    ```
    document.getElementById("pizzaSize").innerHTML = 'pizza-size-options';
    ```
    * Switched
    ```
    var windowWidth = document.querySelector("#randomPizzas").offsetWidth;
    ```
    to
    ```
    var windowWidth = document.getElementById("randomPizzas").offsetWidth;
    ```

    * In the initial implementation, when looping through the pizza sizes to change them, the pizza size was checked on every pizza through the loop. Every pizza had the same value, so this was unnecessary.
    * I also reduced the number of pizzas created on page load without visibly impacting the moving pizzas for the user.
* Images
  * Adjusted the image size, i.e. an image that takes up 600px max on the screen does not need to be 2000px wide
  * Used ImageOptim software to compress the images
