const ON_PASTE = e => {
    // When there is no data in the clipboard, return false
    if(!(e.clipboardData && e.clipboardData.items)) {
        return false;
    }
    // Otherwise, return a Promise Object,and do some logic operation
    return new Promise((resolve, reject) => {
        for(let i = 0; i < e.clipboardData.items.length; i++) {
            // Iterate data and judge the kind of it.
            let item = e.clipboardData.items[i];
            if(item.kind === "string") {
                // If the kind of it is string,resolve the callback of the getAsString()
                item.getAsString((str) => {
                    resolve(str);
                })
            } else if(item.kind === "file") {
                // If the kind of it is file,change it to base64 and resolve to the then() function.
                const PASTE_FILE = item.getAsFile();
                let fileReader = new FileReader();
                fileReader.readAsDataURL(PASTE_FILE);
                fileReader.onloadend = e => {
                    const BASE64 = e;
                    resolve(BASE64);
                }
            } else {
                // throw error when the kind is not support
                reject(new Error("Not allow to paste this type"));
            }
        }
    })
};