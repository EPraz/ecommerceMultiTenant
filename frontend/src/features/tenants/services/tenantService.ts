import { api } from "../../../services";

export const getTenantSlugById = async (tenantId: string): Promise<string> => {
  const res = await api.get(`/tenants/${tenantId}/slug`);
  return res.data.slug;
};
