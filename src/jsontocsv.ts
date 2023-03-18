import ITrack from "./interface/ITrack.ts";

console.log(`++ JSON to csv ++`);

const outFileName = "out.csv";
const delimiter = ',';
const debugEnabled = false;

await readInputFile();


async function readInputFile() {
    const inFileRegEx = /in=[A-Za-z0-9/]+\.json/;
    const inFileName = Deno.args.find(arg => inFileRegEx.test(arg))?.split("=")[1];

    if (inFileName === undefined) {
        console.log(`No input file found`);
        printHelpAndExit();
    } else {
        debugEnabled && console.log(`Arg for file found: ${inFileName}`);

        await Deno.readTextFile(inFileName).then((file) => {
            console.log(`Successully read file with ${file.length} bytes.`);
            const tracks: ITrack[] = parseJsonFile(file);
            debugEnabled && tracks.forEach(entry => {
                console.log(`Entry: ${JSON.stringify(entry)}`);
            });

            const csvContent: string = generateCsvTrackList(tracks);
            Deno.writeTextFile(outFileName, csvContent);

        }).catch(() => {
            console.log(`Error reading file.`);
        });
    }
}

function parseJsonFile(fileContent: string): ITrack[] {
    return JSON.parse(fileContent);
}

function generateCsvTrackList(tracks: ITrack[]): string {
    const header = Object.keys(tracks[0]);
    const csv = [
        header.join(delimiter),
        ...tracks.map(entry => header.map(column => entry[column as keyof ITrack] ?? '').join(delimiter))
    ].join('\r\n');   
    
    debugEnabled && console.log(`csv: ${csv}`);
    return csv;
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
