CREATE TABLE IF NOT EXISTS workers (
    profile_picture BLOB,
    name VARCHAR2(35),
    m_last_name VARCHAR2(35),
    f_last_name VARCHAR2(35),
    phone VARCHAR2(15),
    email VARCHAR2(255),
    entry_date DATE,
    salary NUMBER,
    functions VARCHAR2(255)
);