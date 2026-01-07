interface Tags {
  id_tag: number;
  id_work: number;
}
interface TechniqueData {
  id_technique: number;
  id_work: number;
}
interface Institution {
  id: number;
  name: string;
}
interface Author {
  id: number;
  name: string;
  surnames: string;
}

export interface ImageData {
  id: number;
  id_work: number;
  big_image_for_slider: number;
  extra_folder: string;
  filename: string;
  width_big: number;
  width_box: number;
  width_list: number;
  width_thumb: number;
  height_big: number;
  height_box: number;
  height_list: number;
  height_thumb: number;
  languageData: [];
}

export interface Work {
  id: number;
  name: string;
  id_institution: number;
  id_author: number;
  id_rights: number;
  date: string;
  slug: string;
  date_copy: string;
  decades: string;
  author: Author;
  institution: Institution;
  imagesData: ImageData[];
  tagsData: Tags[];
  techniqueData: TechniqueData[];
}
