const AVATAR_COLORS = [
    '#E24B4A', // 0 — красный
    '#D85A30', // 1 — коралл
    '#C77F1A', // 2 — янтарь
    '#639922', // 3 — зелёный
    '#1D9E75', // 4 — бирюза
    '#378ADD', // 5 — синий
    '#534AB7', // 6 — фиолет
    '#7F77DD', // 7 — лавандовый
    '#D4537E', // 8 — розовый
    '#5F5E5A', // 9 — серый
];

export function getAvatarColor(id: number): string {
    return AVATAR_COLORS[id % 10];
}