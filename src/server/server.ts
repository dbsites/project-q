
// define listening port
const PORT: number = 3000;

const app: any = require('./api')

// wake up the server
app.listen(PORT, () => {
    console.log(`He is beginning to believe. Port: ${PORT}`);
})
