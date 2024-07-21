export default function delayForDemo(promise : any) {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    }).then(() => promise);
}