console.log(`++ JSON to csv ++`);

const outFileName: string = "out.csv";

await readInputFile();


async function readInputFile() {
    const inFileRegEx = /in=[A-Za-z0-9/]+\.json/;
    const inFileName = Deno.args.find(arg => inFileRegEx.test(arg))?.split("=")[1];

    if (inFileName === undefined) {
        console.log(`No input file found`);
        printHelpAndExit();
    } else {
        console.log(`Arg for file found: ${inFileName}`);

        await Deno.readTextFile(inFileName).then((file) => {
            console.log(`Successully read file with ${file.length} bytes.`);
        }).catch(() => {
            console.log(`Error reading file.`);
        });
        
    }
}

/* Helper */
function printHelpAndExit() {
    console.log(`Programm args: `);
    Deno.args.forEach((arg, index) => {
        console.log(`Arg[${index}]: ${arg}`);
    });

    console.log(`Usage: ${Deno.execPath()} in=[jsonfilename].json`);
    Deno.exit(1);
}
