import { Reference } from "./CentilesObject";
export interface MidParentalHeightObject {
    mid_parental_height?: number;
    mid_parental_height_sds?: number;
    mid_parental_height_centile?: number;
    mid_parental_height_centile_data?: Reference[];
    mid_parental_height_upper_centile_data?: Reference[];
    mid_parental_height_lower_centile_data?: Reference[];
    mid_parental_height_lower_value?: number;
    mid_parental_height_upper_value?: number;
}