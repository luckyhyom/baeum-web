export function checkLength(lenth, min, max, setState) {
    if(lenth < min) {
        return setState('길이가 짧습니다.')
    }
    if(lenth > max) {
        return setState('길이가 깁니다.')
    }
    return setState(undefined)
}