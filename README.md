## Website Performance Optimization portfolio project

Navigate to the views/pizza.html and confirm via the Chrome dev tools that the pizzas are properly rendered and are at an acceptable FPS. In order to effectively test the site with Google PageSpeed Insights, the site must be available to the wider internet. The site can be accessed at [website optimization] (https://meaganc.github.io/website-optimization/).

### Changes Made to Optimize
* Index.html
    * Async Javascript
    ```
    <script async src="http://www.google-analytics.com/analytics.js"></script>
    ```
    * Initially, I utilized the information from [this](http://keithclark.co.uk/articles/loading-css-without-blocking-render/) blog post to asynchronously load CSS.
    ```
    <link href="css/style.css" rel="stylesheet" media="none" onload="if(media!='all')media='all'">
    ```
    This produced a very significant impact on the Index PageSpeed Insights score, but it was not enough to take the score over 90. To achieve this final step, I configured grunt to run the grunt-inline task and inline the CSS in the output HTML, and then cleaned up this HTML using an HTML beautifier.
    * Webfonts were left as is, as they did not make a significant impact on the PageSpeed Insights score. However, we could save them locally if it became a concern.
* Main.js
  * The main bottleneck was the creation of the pizzas and the resizing of the pizzas.
    * For creating the pizzas, I reduced the number of pizzas created on document load without visibly impacting the amount of moving pizzas for the user.
    * When the page is scrolled, the image movement only changes every two frames rather than every frame. This significantly cut down on the FPS required.
    * Switched from using
    ```
    items[i].style.left = ...;
    ```
    to
    ```
    items[i].style.transform = ...;
    ```
    was one of the most significant changes in terms of FPS. Changing the left property requires the [Layout operation](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/), which is much more browser-intensive. To compensate for this, I initially increased the number of columns on the moving pizzas to 12.
    ```
    <div id="movingPizzas1" class="col-md-12"></div>
    ```
    Apparently, on some  screens this was not enough, so I also switched ```elem.style.left``` to ```elem.basicLeft = (i % cols) * s;```
    * Performance Tweak: Switched
    ```
    document.querySelector("#pizzaSize").innerHTML = 'pizza-size-options';
    ```
    to
    ```
    document.getElementById("pizzaSize").innerHTML = 'pizza-size-options';
    ```
    * Performance Tweak: Switched
    ```
    var windowWidth = document.querySelector("#randomPizzas").offsetWidth;
    ```
    to
    ```
    var windowWidth = document.getElementById("randomPizzas").offsetWidth;
    ```

    * In the initial implementation, when looping through the pizza sizes to change them, the pizza size was checked on every pizza through the loop. Every pizza had the same value, so this was unnecessary and significantly impacted performance. This variable of all pizzas is also used to update the pizza widths so lookup doesn't happen again.
* Images
  * Adjusted the image size, i.e. an image that takes up 600px max on the screen does not need to be 2000px wide
  * Used ImageOptim software to compress the images
