# fresh project

### Usage

Start the project:

```
deno run -A --watch main.ts
```

After adding, removing, or moving a page in the `routes` or directory, or adding,
removing, or moving an island in the `islands` directory, run:

```
fresh manifest
```
# Remember! 
  * only code in an island is executed in the Browser!
    If onClick={handler} is not working, make sure its in an island!