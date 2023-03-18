# Deno Test Project
- [Deno official website](https://deno.land)
- [Official Examples](https://examples.deno.land/)

## Target: Get input JSON and produce output .csv
- Usage:

    `deno run --allow-read --allow-write src/jsontocsv.ts in=res/tracklist.json`

- Expected output: 

    `out.csv`
    
     with content of provided json-File

### Setup environment
- Install Deno and setup environment as described [here](https://deno.land/manual@v1.31.3/getting_started/setup_your_environment)
- Checkout project
- VSCode: Install Deno extension
    - `CTRL + Shift + P` and run `Deno: Initialize Workspace Configuration` to connect to CLI language server
