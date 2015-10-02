# ut-angular-toast

Angular directive that display a toasted notification at the top right corner of your application.

You can define the type (color of the background), the message and the delay of the toast.
You can programmatically control the removing of a single toast or of all of them.

### Installation

Install via bower :

```shell
bower install ut-angular-toast
```

### Usage

Add it as a dependency to your app:

```javascript
angular.module('app', ['untemps.utToast']);
```

Append a toast everywhere in your code by injecting the utToast service:

```javascript
utToast.append('success', 'My message', 5000);
```

### 'utToast' API

* `append(toastType, toastMessage, toastDelay)`:  
Append a toast by specifying the type, the message and the delay.  
Return the toast object just appended.
    * `toastType`: Type of the toast ('success', 1, 'error', 2, 'warning', 3, 'info', 4, 'neutral', 5) (default: 1). Use the utToastType constant to be sure to pass a valid value.
    * `toastMessage`: Message of the toast. You can use HTML in the message.
    * `toastDelay`: Delay of the toast in milliseconds (default: 5000).


* `remove(toast)`:  
Remove a toast.  
Return true if the toast has been removed.
    * `toast`: Toast object to remove.


* `removeAll()`  
Remove all the displayed toasts.
Return true if all the toast have been removed.

### Development

Install Gulp via npm if you don't have it:

```shell
npm install -g gulp
```

### Available commands

* `gulp`: build and test the project
* `gulp build`: build the project and make new files in`dist`
* `gulp serve`: start a server to serve the demo page and launch a browser then watches for changes in `src` files to reload the page
* `gulp test`: run tests
* `gulp serve-test`: runs tests and keep test browser open for development. Watches for changes in source and test files to re-run the tests

### License
MIT
Thanks to send me an email when using this directive (v.lebadezet@untemps.net).