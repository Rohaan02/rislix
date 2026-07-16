import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateComplianceScore, scoreForStatus } from '../app/services/compliance_score.js';
test('scoreForStatus maps implemented to 100', () => {
    assert.equal(scoreForStatus('implemented'), 100);
});
test('scoreForStatus excludes not_applicable', () => {
    assert.equal(scoreForStatus('not_applicable'), null);
});
test('calculateComplianceScore averages applicable controls', () => {
    const score = calculateComplianceScore([
        'implemented',
        'partially_implemented',
        'not_applicable',
    ]);
    assert.equal(score, 75);
});
//# sourceMappingURL=compliance_score.spec.js.map