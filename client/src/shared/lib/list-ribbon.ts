type Ribbon = { label: string; color: string };

const RIBBONS: Record<string, Ribbon> = {
    planned: { label: 'В планах', color: '#378ADD' },   
    watching: { label: 'Смотрю', color: '#C77F1A' },    
    watched: { label: 'Просмотрено', color: '#639922' },
};

export function getStatusRibbon(status: string): Ribbon | null {
    return RIBBONS[status] ?? null;
}