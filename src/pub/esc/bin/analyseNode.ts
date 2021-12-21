#!/usr/bin/env node

import * as tsmorph from "ts-morph"
import * as ts from "typescript"

const [, , tsconfigPath, parentKindName] = process.argv

if (tsconfigPath === undefined) {
    throw new Error("missing tsconfig path")
}
if (parentKindName === undefined) {
    throw new Error("missing parentKindName")
}


const project = new tsmorph.Project({})

project.addSourceFilesFromTsConfig(tsconfigPath)


const found: string[] = []

const kindCache: { [key: number]: string } = {}


for (const name of Object.keys(ts.SyntaxKind).filter(k => isNaN(parseInt(k, 10)))) {
    //@ts-expect-error
    const value = ts.SyntaxKind[name]
    kindCache[value] = name
}

project.getSourceFiles().forEach(($) => {
    const filePath = $.getFilePath()
    function doNode(
        $: ts.Node,
    ) {
        $.forEachChild(($) => {
            doNode($)
        })
        function getKindName($: ts.Node): string {
            return kindCache[$.kind]
        }
        function getLineInfo(
        ) {
            const lc = ts.getLineAndCharacterOfPosition($.getSourceFile(), $.getStart($.getSourceFile()))
            return `[${lc.line + 1}, ${lc.character + 1}]`
        }
        if (getKindName($) === parentKindName) {
            console.log(`${filePath}${getLineInfo()}`)
            $.forEachChild(($) => {
                const kindName = getKindName($)

                if (!found.includes(kindName)) {
                    found.push(kindName)
                }
                console.log(`\t${kindName}`)
            })
        }
    }
    doNode($.compilerNode)
})

console.log("")
console.log("found children:")
found.sort().forEach(($) => {
    console.log($)
})
