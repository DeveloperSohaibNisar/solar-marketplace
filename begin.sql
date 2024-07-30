begin
  insert into public.vendors (id, name,email,address,number,contact_person_name,business_license_picture_url,vat_number)
  values (new.id, new.raw_user_meta_data ->> 'name', new.email,new.raw_user_meta_data ->> 'address',new.raw_user_meta_data ->> 'number',new.raw_user_meta_data ->> 'contact_person_name',new.raw_user_meta_data ->> 'business_license_picture_url',new.raw_user_meta_data ->> 'vat_number');
  return new;
end;


begin
  if new.raw_user_meta_data ->> 'role'='vendor' then 
    insert into public.vendors (id, name,email,address,number,contact_person_name,business_license_picture_url,vat_number)
    values (new.id, new.raw_user_meta_data ->> 'name', new.email,new.raw_user_meta_data ->> 'address',new.raw_user_meta_data ->> 'number',new.raw_user_meta_data ->> 'contact_person_name',new.raw_user_meta_data ->> 'business_license_picture_url',new.raw_user_meta_data ->> 'vat_number');
    return new;
  else
    insert into public.users (id, name,email,role)
    values (new.id, new.raw_user_meta_data ->> 'name', new.email,new.raw_user_meta_data ->> 'role');
    return new;
  end if
end;

