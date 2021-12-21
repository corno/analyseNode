

# analyseNode
simple tool to analyse a TypeScript node of a certain kind.
It reports the locations where the nodes of this kind were found, what its children were,
and finally a list of all the kinds of children found.

## installation
npm install -g analysenode
## usage
analyseNode <path-to-tsconfig> <node-kindname>

## example
running the following command

````
analyseNode ./tsconfig.json FunctionDeclaration
````
in the root of this repository yields

````
/home/corno/workspace/analyseNode/src/pub/esc/bin/analyseNode.ts[40, 9]
        Identifier
        Parameter
        StringKeyword
        Block
/home/corno/workspace/analyseNode/src/pub/esc/bin/analyseNode.ts[43, 9]
        Identifier
        Block
/home/corno/workspace/analyseNode/src/pub/esc/bin/analyseNode.ts[34, 5]
        Identifier
        Parameter
        Block

found children:
Block
Identifier
Parameter
StringKeyword
````