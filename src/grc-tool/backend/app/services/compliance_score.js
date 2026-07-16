const SCORE_MAP = {
    not_started: 0,
    non_compliant: 0,
    partially_implemented: 50,
    implemented: 100,
    compliant: 100,
    needs_review: 50,
    not_applicable: null,
};
export function scoreForStatus(status) {
    if (!(status in SCORE_MAP))
        return 0;
    return SCORE_MAP[status];
}
export function calculateComplianceScore(statuses) {
    const applicable = statuses.filter((s) => s !== 'not_applicable');
    if (applicable.length === 0)
        return 0;
    const total = applicable.reduce((sum, s) => sum + (scoreForStatus(s) ?? 0), 0);
    return Math.round((total / applicable.length) * 100) / 100;
}
//# sourceMappingURL=compliance_score.js.map