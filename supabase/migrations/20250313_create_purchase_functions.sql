-- Create a function to check if a user has purchased a specific ebook
CREATE OR REPLACE FUNCTION has_purchased_ebook(user_id UUID, ebook_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM purchase_items pi
    JOIN user_purchases up ON pi.purchase_id = up.id
    WHERE up.user_id = has_purchased_ebook.user_id
    AND pi.ebook_id = has_purchased_ebook.ebook_id
    AND up.status = 'completed'
  );
END;
$$;

-- Create a function to get all ebooks purchased by a user
CREATE OR REPLACE FUNCTION get_user_purchased_ebooks(user_id UUID)
RETURNS SETOF UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
    SELECT pi.ebook_id
    FROM purchase_items pi
    JOIN user_purchases up ON pi.purchase_id = up.id
    WHERE up.user_id = get_user_purchased_ebooks.user_id
    AND up.status = 'completed';
END;
$$;

-- Grant access to these functions
GRANT EXECUTE ON FUNCTION has_purchased_ebook(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_purchased_ebooks(UUID) TO authenticated;
