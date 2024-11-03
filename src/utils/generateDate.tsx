export const generateDate=(postedAt: string): string => {
    if (postedAt === 'ok') return 'Just Now';
    
    const current = new Date();
    const datePosted = new Date(postedAt);
    const diffDate = current.getTime() - datePosted.getTime();
    const displayDate = new Date(postedAt);
    
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    if (diffDate <= 1000) {
        return 'Just Now';
    } else if (diffDate < 60000) {
        const seconds = Math.floor(diffDate / 1000);
        return `${seconds} ${seconds === 1 ? 'SECOND' : 'SECONDS'} AGO`;
    } else if (diffDate < 3600000) {
        const minutes = Math.floor(diffDate / 60000);
        return `${minutes} ${minutes === 1 ? 'MINUTE' : 'MINUTES'} AGO`;
    } else if (diffDate < 86400000) {
        const hours = Math.floor(diffDate / 3600000);
        return `${hours} ${hours === 1 ? 'HOUR' : 'HOURS'} AGO`;
    } else if (diffDate < 604800000) {
        const days = Math.floor(diffDate / 86400000);
        return `${days} ${days === 1 ? 'DAY' : 'DAYS'} AGO`;
    } else if (diffDate < 2415600000) {
        const weeks = Math.floor(diffDate / 604800000);
        return `${weeks} ${weeks === 1 ? 'WEEK' : 'WEEKS'} AGO`;
    } else if (diffDate < 31536000000) {
        const monthsAgo = Math.floor(diffDate / 2415600000);
        return `${monthsAgo} ${monthsAgo === 1 ? 'MONTH' : 'MONTHS'} AGO`;
    } else {
        return `${displayDate.getDate()} ${months[displayDate.getMonth()]} ${displayDate.getFullYear()}`;
    }
};
