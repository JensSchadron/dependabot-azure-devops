import { getVariable } from "azure-pipelines-task-lib/task";

export default function convertPlaceholder(input: string): string {
    const variableNameExp : string = "[a-zA-Z_]+[a-zA-Z0-9_]*"
    const variableLeftExp : string = "\\${{"
    const variableRightExp : string = "}}"
    const regexp : RegExp = new RegExp(variableLeftExp + "\\s*(" + variableNameExp + ")\\s*" + variableRightExp, 'g');

    let result : string = input;
    const matches = matchAll(input, regexp);

    for (const match of matches) {
        var placeholder = match[0];
        var name = match[1];
        var value = getVariable(name) ?? placeholder;
        result = result.replace(placeholder, value);
    }
    return result;
}

function matchAll( target : string, rExp : RegExp, matches : Array<RegExpExecArray> = []) {
    const matchIfAny  = rExp.exec(target);
    matchIfAny && matches.push(matchIfAny) && matchAll(target, rExp, matches);
    return matches;
}