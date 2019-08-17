This project was an idea of [Daniel Pacheco](https://www.facebook.com/profile.php?id=750738309) and was coded by [Jhonathan Espinosa](https://twitter.com/st4nn), any questions please reach us.

## What is tribet

We want to get all live data from the bet sites, in Colombia for the moment, and join them in a same site to compare them.

### How to install

You will need a NodeJS server, with the npm package manager.<br>
In your server console type:

```git clone https://github.com/st4nn/tribet.git```

This instruction will downloads all the source in your server, when the command finishes, open the new folder:

```cd tribet```

Install the dependencies:

```npm install```

Executes the server. This is only a suggestion, you may use your preferred method to start a Node instance.

```npm run start```

By default will execute itself on the port 4000. You may change it with the PORT environment like this:

```PORT=8888 npm run start```

or in the source on `index.js` file, line 4.

### How to use

When the server is running, execute the above address in your browser, or use it to your http request.

```http://{YOUR_SERVER_ADDRESS}:{YOUR_SERVICE_PORT}/{BET_SITE_NAME}```

for example:

```http://localhost:4000/wplay```

if there isn't troubles, it will returns a json array, Where each element will have follow structure:

|Parameter  |Type   |Description    |Example    |
|-----------|:-----:|---------------|----------:|
|ligue      |String |Name of the ligue that contain the match|UEFA Champios Leage   |
|match      |String |Names of the two teams of the match | AC Cesena vs. AC Milán   |
|currentScore   |String   |Match Score  |2:1    |
|time   |String |Time elapsed of the match  |83'  |
|choices    |JsonArray  |Bet prices by choice   |[{"name":"AC Milán","price":4.15},{"name":"AC Cesena","price":20},{"name":"Empate","price":1.25}]|

## License

ISC License,

> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIEDWARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.