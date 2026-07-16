import Permission from '#models/permission';
export default class PermissionsController {
    async index({ response }) {
        const permissions = await Permission.query().orderBy('group').orderBy('name');
        const grouped = permissions.reduce((acc, p) => {
            if (!acc[p.group])
                acc[p.group] = [];
            acc[p.group].push(p);
            return acc;
        }, {});
        return response.ok({ permissions, grouped });
    }
}
//# sourceMappingURL=permissions_controller.js.map