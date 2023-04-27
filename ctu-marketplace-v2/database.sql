use marketplace;
CREATE TABLE about_page (
    id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE home_page_video (
    id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL DEFAULT 'https://marketplace.ctu.edu.vn/api/v2/upload-file/download/default.mp4',
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE commercial_development_level (
    commercial_project_id BIGINT NOT NULL,
    development_level_id BIGINT NOT NULL,
    note VARCHAR(500),
    PRIMARY KEY (commercial_project_id , development_level_id)
)  ENGINE=INNODB;
CREATE TABLE commercial_project (
    advantage LONGTEXT,
    price VARCHAR(255),
    process LONGTEXT,
    scope LONGTEXT,
    id BIGINT NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE commercial_transmission_method (
    commercial_project_id BIGINT NOT NULL,
    transmission_method_id BIGINT NOT NULL,
    note VARCHAR(500),
    PRIMARY KEY (commercial_project_id , transmission_method_id)
)  ENGINE=INNODB;
CREATE TABLE contact (
    id BIGINT NOT NULL AUTO_INCREMENT,
    created_date DATETIME(6),
    is_deleted BIT,
    updated_date DATETIME(6),
    content LONGTEXT NOT NULL,
    email VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    is_replied BIT,
    phone_number VARCHAR(12) NOT NULL,
    title VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE customer_contact (
    id BIGINT NOT NULL AUTO_INCREMENT,
    created_date DATETIME(6),
    is_deleted BIT,
    updated_date DATETIME(6),
    content LONGTEXT NOT NULL,
    email VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    is_replied BIT,
    phone_number VARCHAR(12) NOT NULL,
    project_id BIGINT NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE development_level (
    id BIGINT NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE domain (
    id BIGINT NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE faq (
    id BIGINT NOT NULL AUTO_INCREMENT,
    answer LONGTEXT NOT NULL,
    question LONGTEXT NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE field (
    id BIGINT NOT NULL,
    name VARCHAR(500) NOT NULL,
    child_of_field_id BIGINT,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE footer (
    id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE functions (
    id BIGINT NOT NULL,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500),
    role_id BIGINT NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE group_detail (
    id BIGINT NOT NULL AUTO_INCREMENT,
    avatar VARCHAR(500),
    bio LONGTEXT,
    email VARCHAR(255),
    full_name VARCHAR(255),
    qualification VARCHAR(500),
    website VARCHAR(500),
    research_group_id BIGINT,
    role_of_group_id BIGINT,
    user_profile_id BIGINT,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE idea_project (
    description LONGTEXT,
    scope LONGTEXT,
    id BIGINT NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE password_reset_code (
    id BIGINT NOT NULL AUTO_INCREMENT,
    expiry_date DATETIME(6) NOT NULL,
    reset_code VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE project (
    id BIGINT NOT NULL AUTO_INCREMENT,
    created_date DATETIME(6),
    is_deleted BIT NOT NULL,
    updated_date DATETIME(6),
    address VARCHAR(1000),
    author VARCHAR(255),
    company_name VARCHAR(1000),
    email VARCHAR(255),
    fax VARCHAR(12),
    is_highlighted BIT,
    name VARCHAR(1000),
    phone_number VARCHAR(12),
    project_image VARCHAR(1000),
    project_type VARCHAR(255),
    ranking BIGINT,
    short_description VARCHAR(1000),
    template BIGINT,
    website VARCHAR(1000),
    approver_id BIGINT,
    status_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE project_field (
    field_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    PRIMARY KEY (field_id , project_id)
)  ENGINE=INNODB;
CREATE TABLE research_group (
    id BIGINT NOT NULL AUTO_INCREMENT,
    created_date DATETIME(6),
    is_deleted BIT NOT NULL,
    updated_date DATETIME(6),
    group_image VARCHAR(1000) NOT NULL,
    group_name VARCHAR(1000) NOT NULL,
    introduction LONGTEXT,
    publication LONGTEXT,
    research_topic LONGTEXT,
    short_description VARCHAR(1000) NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE researching_project (
    benefit LONGTEXT,
    challenge LONGTEXT,
    solution LONGTEXT,
    id BIGINT NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE role (
    id BIGINT NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE role_of_group (
    id BIGINT NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE status (
    id BIGINT NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE transmission_method (
    id BIGINT NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
CREATE TABLE user_function (
    function_id BIGINT NOT NULL,
    user_profile_id BIGINT NOT NULL,
    is_enabled BIT,
    PRIMARY KEY (function_id , user_profile_id)
)  ENGINE=INNODB;
CREATE TABLE user_profile (
    id BIGINT NOT NULL AUTO_INCREMENT,
    created_date DATETIME(6),
    is_deleted BIT NOT NULL,
    updated_date DATETIME(6),
    address VARCHAR(1000),
    avatar VARCHAR(1000),
    bio LONGTEXT,
    dob DATE,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    gender INTEGER,
    get_news BIT,
    is_enabled BIT NOT NULL,
    is_locked BIT NOT NULL,
    password VARCHAR(255),
    phone_number VARCHAR(12),
    qualification VARCHAR(500),
    username VARCHAR(255),
    provider VARCHAR(255) DEFAULT 'local',
    website VARCHAR(1000),
    domain_id BIGINT NOT NULL,
    password_reset_code_id BIGINT,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
alter table user_profile add constraint UK_9551piq2wp9kh4kket0wr65vt unique (username);
alter table user_profile AUTO_INCREMENT=1000;
alter table commercial_development_level add constraint FK9hdikj82nwd529df5ct5129su foreign key (commercial_project_id) references commercial_project (id);
alter table commercial_development_level add constraint FK57lacbufuqc9rltnyo340vdfv foreign key (development_level_id) references development_level (id);
alter table commercial_project add constraint FKc21a85xmq5wd2sjjmj3yg1tsy foreign key (id) references project (id);
alter table commercial_transmission_method add constraint FK6pfbfjx1bb9qayjk7nui0isf3 foreign key (commercial_project_id) references commercial_project (id);
alter table commercial_transmission_method add constraint FK1w0ocogvtgr6ivyx4j3j5vkxb foreign key (transmission_method_id) references transmission_method (id);
alter table customer_contact add constraint FK50urimuuxcv4cxgpwvfyo8536 foreign key (project_id) references project (id);
alter table field add constraint FK1bynjb8iw58x2gt01gualp00p foreign key (child_of_field_id) references field (id);
alter table functions add constraint FK3ln883697wxnlhotxq7i006yy foreign key (role_id) references role (id);
alter table group_detail add constraint FKnlon8yblw9fsca6t8035t6xik foreign key (research_group_id) references research_group (id);
alter table group_detail add constraint FKac88mwfoxr40chnyixsn2pys0 foreign key (role_of_group_id) references role_of_group (id);
alter table group_detail add constraint FK94ic1vejr6wcfxim7r832t8uj foreign key (user_profile_id) references user_profile (id);
alter table idea_project add constraint FKcfjlm8oudwxy166c0rjcjcchv foreign key (id) references project (id);
alter table project AUTO_INCREMENT=1000;
alter table project add constraint FK7ai3sryd5mvis1i3uqhpytmc8 foreign key (approver_id) references user_profile (id);
alter table project add constraint FKiwo74yc7wlfnk1t8m5rup6cao foreign key (status_id) references status (id);
alter table project add constraint FKj7tkcpv3aln1ufnui1e91pwyp foreign key (user_id) references user_profile (id);
alter table project_field add constraint FKau15libp6x60uwa50w5bfcpum foreign key (field_id) references field (id);
alter table project_field add constraint FKf78597jcwnmr6jtofgn0oham0 foreign key (project_id) references project (id);
alter table research_group add constraint FK9pyn44pj1kpep4r7vrb0s69if foreign key (user_id) references user_profile (id);
alter table research_group AUTO_INCREMENT=1000;
alter table researching_project add constraint FKg3vqrmve0qxeks83lj1ahcbkv foreign key (id) references project (id);
alter table user_function add constraint FKswv7hh9fhjo26fyh4oas0bxke foreign key (function_id) references functions (id);
alter table user_function add constraint FKoqye0efgipq16w8xhleup3r1d foreign key (user_profile_id) references user_profile (id);
alter table user_profile add constraint FKjqe2wh2gtvuo7n85n2jvxhfb7 foreign key (domain_id) references domain (id);
alter table user_profile add constraint FKah5v987xsq46tapdnpod83acg foreign key (password_reset_code_id) references password_reset_code (id);
alter table user_profile add constraint FK93vvtknbpduxlei8xo33hwp02 foreign key (role_id) references role (id);

INSERT INTO `domain` (`id`, `code`, `name`) VALUES ('101', 'DHCT', 'Đại Học Cần Thơ');
INSERT INTO `domain` (`id`, `code`, `name`) VALUES ('999', 'KHC', 'Khác');

INSERT INTO `role` (`id`, `code`, `name`) VALUES ('101', 'SAD', 'SUPER ADMIN');
INSERT INTO `role` (`id`, `code`, `name`) VALUES ('102', 'AD', 'ADMIN');
INSERT INTO `role` (`id`, `code`, `name`) VALUES ('103', 'NNC', 'Nhà Nghiên Cứu');
INSERT INTO `role` (`id`, `code`, `name`) VALUES ('104', 'KCH', 'Khách');

INSERT INTO `status` (`id`, `code`, `name`) VALUES ('101', 'DD', 'Đã Duyệt');
INSERT INTO `status` (`id`, `code`, `name`) VALUES ('102', 'CD', 'Chờ Duyệt');
INSERT INTO `status` (`id`, `code`, `name`) VALUES ('103', 'TC', 'Từ Chối');
INSERT INTO `status` (`id`, `code`, `name`) VALUES ('104', 'LN', 'Lưu Nháp');

INSERT INTO `development_level` (`id`, `code`, `name`) VALUES ('101', 'QMCN', 'Quy Mô Công Nghiệp');
INSERT INTO `development_level` (`id`, `code`, `name`) VALUES ('102', 'TMH', 'Thương Mại Hóa');
INSERT INTO `development_level` (`id`, `code`, `name`) VALUES ('103', 'SXTN', 'Sản Xuất Thử Nghiệm');
INSERT INTO `development_level` (`id`, `code`, `name`) VALUES ('999', 'KHC', 'Khác');


INSERT INTO `transmission_method` (`id`, `code`, `name`) VALUES ('101', 'TDDH', 'Theo Đơn Đặt Hàng');
INSERT INTO `transmission_method` (`id`, `code`, `name`) VALUES ('102', 'BTT', 'Bán Trực Tiếp');
INSERT INTO `transmission_method` (`id`, `code`, `name`) VALUES ('103', 'DT', 'Đào Tạo');
INSERT INTO `transmission_method` (`id`, `code`, `name`) VALUES ('999', 'KHC', 'Khác');

INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('101', 'QLND', 'Quản Lý Người Dùng','', 102);
INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('102', 'QLDA', 'Quản Lý Dự Án','', 102);
INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('103', 'QLLH', 'Quản Lý Liên Hệ','', 102);
INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('104', 'QLTT', 'Quản Lý Thông Tin','', 102);
INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('105', 'QLVT', 'Quản Lý Vai Trò','', 102);
INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('106', 'QLDM', 'Quản Lý Domain','', 102);
INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('107', 'QLCN', 'Quản Lý Chức Năng','', 102);
INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('108', 'QLNNC', 'Quản Lý Nhóm Nghiên Cứu','', 102);
INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('109', 'QLFAQ', 'Quản Lý FAQ','', 102);
INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('110', 'QLGT', 'Quản Lý Giới Thiệu','', 102);
INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('111', 'QLFT', 'Quản Lý Footer','', 102);
INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('112', 'QLHPV', 'Quản Lý Home Page Video','', 102);
-- INSERT INTO `functions` (`id`, `code`, `name`,`url`, `role_id`) VALUES ('113', 'QLHD', 'Quản Lý Header','', 102);

-- KHNN

INSERT INTO `field` (`id`, `name`) VALUES ('4', 'Khoa học nông nghiệp');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('401', 'Trồng trọt', '4');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('402', 'Chăn nuôi', '4');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('403', 'Thú y', '4');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('404', 'Lâm nghiệp', '4');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('405', 'Thủy sản', '4');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('406', 'Công nghệ sinh học trong nông nghiệp', '4');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('499', 'Khoa học nông nghiệp khác', '4');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('40106', 'Bảo vệ thực vật', '401');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('40107', 'Bảo quản và chế biến nông sản', '401');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('40503', 'Bảo quản và chế biến nông sản', '405');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('40504', 'Bảo quản và chế biến nông sản', '405');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('40601', 'Công nghệ gen', '406');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('40602', 'Các công nghệ tế bào trong nông nghiệp', '406');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('40603', 'Các công nghệ enzym và protein trong nông nghiệp', '406');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('40604', 'Các công nghệ vi sinh vật trong nông nghiệp', '406');

INSERT INTO `footer` (`id`,`name`, `content`) VALUES ('101','Footer', 'Footer Content');
INSERT INTO `about_page` (`id`,`name`, `content`) VALUES ('101','Giới Thiệu', 'About Page Content');
INSERT INTO `home_page_video` (`id`,`name`, `url`) VALUES ('101','Video Trang Chủ', 'https://marketplace.ctu.edu.vn/api/v2/file/download/default.mp4');


-- KHTN
INSERT INTO `field` (`id`, `name`) VALUES ('1', 'Khoa học tự nhiên');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('101', 'Toán học và thống kê', '1');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('102', 'Khoa học máy tính và thông tin ', '1');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('103', 'Vật lý', '1');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('104', 'Hoá học', '1');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('105', 'Các khoa học trái đất và môi trường liên quan', 1);
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('106', 'Sinh học', '1');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('199', 'Khoa học tự nhiên khác', '1');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10101', 'Toán học cơ bản', '101');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10102', 'Toán học ứng dụng', '101');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10103', 'Thống kê', '101');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10199', 'Toán học và thống kê khác', '101');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10201', 'Khoa học máy tính', '102');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10202', 'Khoa học thông tin', '102');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10203', 'Sinh tin học', '102');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10299', 'Khoa học máy tính và khoa học thông tin khác', '102');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10301', 'Vật lý nguyên tử; vật lý phân tử và vật lý hóa học', '103');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10302', 'Vật lý các chất cô đặc', '103');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10303', 'Vật lý hạt và trường', '103');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10304', 'Vật lý hạt nhân', '103');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10305', 'Vật lý plasma và chất lỏng', '103');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10307', 'Âm học', '103');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10308', 'Thiên văn học', '103');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10309', 'Khoa học vũ trụ', '103');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10306', 'Quang học', '103');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10399', 'Khoa học vật lý khác', '103');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10401', 'Hoá hữu cơ', '104');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10402', 'Hoá vô cơ và hạt nhân', '104');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10403', 'Hoá lý', '104');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10404', 'Hoá học cao phân tử', '104');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10405', 'Điện hóa', '104');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10406', 'Hoá keo', '104');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10407', 'Hóa phân tích', '104');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10499', 'Khoa học hoá học khác', '104');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10501', 'Địa chất học', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10502', 'Khoáng vật học', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10503', 'Cổ sinh học', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10504', 'Địa vật lý', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10505', 'Địa hóa học', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10506', 'Địa lý tự nhiên', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10507', 'Núi lửa học', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10508', 'Trắc địa học và bản đồ học', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10509', 'Các khoa học môi trường', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10510', 'Khí tượng học và các khoa học khí quyển', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10511', 'Khí hậu học', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10512', 'Hải dương học', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10513', 'Thuỷ văn; Tài nguyên nước', '105');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10599', 'Khoa học trái đất và khoa học môi trường liên quan khác', '105');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10601', 'Sinh học lý thuyết', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10602', 'Tế bào học, Mô - phôi học', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10603', 'Vi sinh vật học', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10604', 'Vi rút học', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10605', 'Hoá sinh; phương pháp nghiên cứu hoá sinh', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10606', 'Sinh học phân tử', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10607', 'Nấm học', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10608', 'Lý sinh', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10609', 'Di truyền học', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10610', 'Sinh học sinh sản', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10611', 'Thực vật học', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10612', 'Động vật học', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10613', 'Sinh học biển và nước ngọt', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10614', 'Sinh thái học', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10615', 'Đa dạng sinh học', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10616', 'Công nghệ sinh học ', '106');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('10699', 'Khoa học sinh học khác ', '106');

-- KHKT
INSERT INTO `field` (`id`, `name`) VALUES ('2', 'Khoa học kỹ thuật và công nghệ');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('201', 'Kỹ thuật dân dụng', '2');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('202', 'Kỹ thuật điện, kỹ thuật điện tử, kỹ thuật thông tin', '2');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('203', 'Kỹ thuật cơ khí', '2');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('204', 'Kỹ thuật hóa học', '2');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('205', 'Kỹ thuật vật liệu và luyện kim', '2');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('206', 'Kỹ thuật y học', '2');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('207', 'Kỹ thuật môi trường', '2');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('208', 'Công nghệ sinh học môi trường', '2');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('209', 'Công nghệ sinh học công nghiệp', '2');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('210', 'Công nghệ nano', '2');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('211', 'Kỹ thuật thực phẩm và đồ uống', '2');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('299', 'Khoa học kỹ thuật và công nghệ khác', '2');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20101', 'Kỹ thuật kiến trúc', '201');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20102', 'Kỹ thuật xây dựng', '201');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20103', 'Kỹ thuật kết cấu và đô thị', '201');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20104', 'Kỹ thuật giao thông vận tải', '201');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20105', 'Kỹ thuật thuỷ lợi', '201');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20106', 'Kỹ thuật địa chất công trình', '201');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20199', 'Kỹ thuật dân dụng khác', '201');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20201', 'Kỹ thuật điện và điện tử', '202');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20202', 'Người máy và điều khiển tự động', '202');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20203', 'Tự động hoá (CAD/CAM, v.v..) và các hệ thống điểu khiển, giám sát; công nghệ điều khiển số bằng máy tính (CNC),..', '202');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20204', 'Các hệ thống và kỹ thuật truyền thông', '202');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20205', 'Viễn thông', '202');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20206', 'Phần cứng và kiến trúc máy tính', '202');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20207', 'Cơ điện tử; hệ vi cơ điện tử (MEMS),.', '202');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20299', 'Kỹ thuật điện, kỹ thuật điện tử, kỹ thuật thông tin không xếp vào mục nào khác ', '202');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20301', 'Kỹ thuật cơ khí nói chung', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20302', 'Chế tạo máy nói chung', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20304', 'Chế tạo máy công cụ', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20305', 'Kỹ thuật cơ khí và chế tạo máy nông nghiệp', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20306', 'Kỹ thuật cơ khí và chế tạo máy thuỷ lợi', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20307', 'Kỹ thuật cơ khí và chế tạo ôtô và giao thông', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20308', 'Kỹ thuật và công nghệ hàng không, vũ trụ', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20309', 'Kỹ thuật và công nghệ âm thanh', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20310', 'Kỹ thuật cơ khí và chế tạo máy xây dựng', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20311', 'Kỹ thuật cơ khí tàu thuỷ', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20312', 'Kỹ thuật cơ khí và chế tạo thiết bị khai khoáng', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20313', 'Kỹ thuật cơ khí và chế tạo thiết bị năng lượng', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20314', 'Kỹ thuật và công nghệ liên quan ñến hạt nhân', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20303', 'Chế tạo máy công cụ', '203');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20399', 'Kỹ thuật cơ khí, chế tạo máy khác ', '203');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20401', 'Sản xuất hóa học công nghiệp nói chung', '204');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20402', 'Kỹ thuật quá trình hóa học nói chung', '204');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20403', 'Kỹ thuật hoá dược', '204');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20404', 'Kỹ thuật hoá vô cơ', '204');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20405', 'Kỹ thuật hoá hữu cơ', '204');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20406', 'Kỹ thuật hoá dầu', '204');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20499', 'Kỹ thuật hóa học khác', '204');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20501', 'Kỹ thuật nhiệt trong luyện kim', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20502', 'Kỹ thuật và công nghệ sản xuất kim loại và hợp kim đen', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20503', 'Kỹ thuật và công nghệ sản xuất kim loại và hợp kim màu', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20504', 'Luyện kim bột', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20505', 'Cán kim loại', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20506', 'Luyện các chất bán dẫn', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20507', 'Vật liệu xây dựng', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20508', 'Vật liệu điện tử', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20509', 'Vật liệu kim loại', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20510', 'Gốm', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20511', 'Màng mỏng, vật liệu sơn, vật liệu phủ', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20512', 'Vật liệu composite', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20513', 'Gỗ, giấy, bột giấy ', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20514', 'Vải, gồm cả sợi, màu và thuốc nhuộm tổng hợp', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20515', 'Vật liệu tiên tiến', '205');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20599', 'Kỹ thuật vật liệu và luyện kim khác', '205');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20601', 'Kỹ thuật và thiết bị y học', '206');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20602', 'Kỹ thuật phân tích mẫu bệnh phẩm', '206');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20603', 'Kỹ thuật phân tích mẫu thuốc', '206');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20605', 'Kỹ thuật chẩn đoán bệnh', '206');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20699', 'Kỹ thuật y học khác', '206');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20701', 'Kỹ thuật môi trường và địa chất, địa kỹ thuật', '207');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20702', 'Kỹ thuật dầu khí', '207');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20703', 'Kỹ thuật năng lượng và nhiên liệu không phải dầu khí', '207');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20704', 'Viễn thám', '207');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20705', 'Khai thác mỏ và xử lý khoáng chất', '207');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20706', 'Kỹ thuật hàng hải, đóng tàu biển', '207');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20707', 'Kỹ thuật đại dương', '207');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20708', 'Kỹ thuật bờ biển', '207');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20799', 'Kỹ thuật môi trường khác', '207');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20801', 'Công nghệ sinh học môi trường nói chung', '208');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20802', 'Xử lý môi trường bằng phương pháp sinh học; các công nghệ sinh học chẩn đoán', '208');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20803', 'Đạo đức học trong công nghệ sinh học môi trường', '208');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20899', 'Công nghệ sinh học môi trường khác', '208');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20901', 'Các công nghệ xử lý sinh học (các quá trình công nghiệp dựa vào các tác nhân sinh học ñể vận hành quy trình), xúc tác sinh học; lên men', '209');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20902', 'Các công nghệ sản phẩm sinh học (các sản phẩm dược chế tạo sử dụng vật liệu sinh học làm nguyên liệu), vật liệu sinh học, chất dẻo sinh học, nhiên liệu sinh học,các hóa chất được chiết tách từ sinh học, các vật liệu mới có nguồn gốc sinh học', '209');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('20999', 'Công nghệ sinh học công nghiệp khác', '209');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('21001', 'Các vật liệu nano', '210');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('21002', 'Các quy trình nano', '210');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('21099', 'Công nghệ nano khác', '210');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('21101', 'Kỹ thuật thực phẩm', '211');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('21102', 'Kỹ thuật đồ uống', '211');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('21199', 'Kỹ thuật thực phẩm và đồ uống khác', '211');

-- KHXH
INSERT INTO `field` (`id`, `name`) VALUES ('5', 'Khoa học xã hội');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('501', 'Tâm lý học', '5');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('502', 'Kinh tế và kinh doanh', '5');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('503', 'Khoa học giáo dục', '5');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('504', 'Xã hội học', '5');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('505', 'Pháp luật ', '5');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('506', 'Khoa học chính trị', '5');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('507', 'Địa lý kinh tế và xã hội', '5');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('508', 'Thông tin ñại chúng và truyền thông', '5');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('599', 'Khoa học xã hội khác', '5');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50101', 'Tâm lý học nói chung', '501');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50102', 'Tâm lý học chuyên ngành', '501');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50199', 'Tâm lý học khác', '501');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50201', 'Kinh tế học; Trắc lượng kinh tế học; Quan hệ sản xuất kinh doanh', '502');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50202', 'Kinh doanh và quản lý', '502');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50299', 'Kinh tế học và kinh doanh khác', '502');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50301', 'Khoa học giáo dục học nói chung, bao gồm cả đào tạo, sư phạm học, lý luận giáo dục,.. ', '503');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50302', 'Giáo dục chuyên biệt', '503');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50399', 'Các vấn đề khoa học giáo dục khác', '503');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50401', 'Xã hội học nói chung', '504');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50402', 'Nhân khẩu học', '504');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50403', 'Nhân chủng học', '504');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50404', 'Dân tộc học', '504');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50405', 'Xã hội học chuyên sề; Khoa học về giới và phụ nữ; Các vấn đề xã hội nghiên cứu gia đình và xã hội; Công tác xã hội', '504');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50499', 'Xã hội học khác', '504');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50501', 'Luật học', '505');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50502', 'Tội phạm học', '505');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50503', 'Hình phạt học', '505');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50599', 'Các vấn để pháp luật khác', '505');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50601', 'Khoa học chính trị', '506');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50602', 'Hành chính công và quản lý hành chính', '506');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50603', 'Lý thuyết tổ chức; Hệ thống chính trị; đảng chính trị', '506');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50699', 'Khoa học chính trị khác', '506');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50701', 'Khoa học môi trường - các khía cạnh xã hội;', '507');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50702', 'Địa lý kinh tế và văn hoá', '507');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50703', 'Nghiên cứu quy hoạch, phát triển đô thị', '507');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50704', 'Quy hoạch giao thông và các khía cạnh xã hội của giao thông vận tải', '507');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50705', 'Địa lý kinh tế và xã hội khác', '507');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50801', 'Báo chí', '508');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50802', 'Thông tin học', '508');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50803', 'Khoa học thư viện', '508');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50804', 'Thông tin đại chúng và truyền thông văn hoá - xã hội', '508');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('50899', 'Thông tin đại chúng và truyền thông khác', '508');

-- YT
INSERT INTO `field` (`id`, `name`) VALUES ('3', 'Khoa học y dược');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('301', 'Y học cơ sở', '3');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('302', 'Y học lâm sàng', '3');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('303', 'Y tế', '3');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('304', 'Dược học', '3');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('305', 'Công nghệ sinh học trong y học', '3');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('399', 'Khoa học y, dược khác', '3');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30101', 'Giải phẫu học và hình thái học', '301');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30102', 'Di truyền học người', '301');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30103', 'Miễn dịch học', '301');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30104', 'Thần kinh học (bao gồm cả Tâm sinh lý học)', '301');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30105', 'Sinh lý học y học', '301');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30106', 'Mô học', '301');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30107', 'Hóa học lâm sàng và sinh hóa y học', '301');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30108', 'Vi sinh vật học y học', '301');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30109', 'Bệnh học', '301');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30199', 'Y học cơ sở khác', '301');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30201', 'Nam học', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30202', 'Sản khoa và phụ khoa', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30203', 'Nhi khoa', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30204', 'Hệ tim mạch', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30205', 'Bệnh hệ mạch ngoại biên', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30206', 'Huyết học và truyền máu', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30207', 'Hệ hô hấp và các bệnh liên quan', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30208', 'Điều trị tích cực và hồi sức cấp cứu', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30209', 'Gây mê ', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30210', 'Chấn thương, Chỉnh hình', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30211', 'Ngoại khoa', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30212', 'Y học hạt nhân và phóng xạ; chụp ảnh y học', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30213', 'Ghép mô, tạng', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30214', 'Nha khoa và phẫu thuật miệng', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30215', 'Da liễu, Hoa liễu', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30216', 'Dị ứng', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30217', 'Bệnh về khớp', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30218', 'Nội tiết và chuyển hoá', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30219', 'Tiêu hoá và gan mật học', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30220', 'Niệu học và thận học', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30221', 'Ung thư học và phát sinh ung thư', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30222', 'Nhãn khoa. Bệnh mắt', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30223', 'Tai mũi họng', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30224', 'Tâm thần học', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30225', 'Thần kinh học lâm sàng', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30226', 'Lão khoa, Bệnh người già', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30227', 'Y học thẩm mỹ, Phẫu thuật thẩm mỹ', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30228', 'Y học tổng hợp và nội khoa', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30229', 'Y học bổ trợ và kết hợp', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30230', 'Y học thể thao, thể dục', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30231', 'Y học dân tộc; y học cổ truyền', '302');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30299', 'Y học lâm sàng khác', '302');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30301', 'Khoa học về chăm sóc sức khoẻ và dịch vụ y tế (bao gồm cả quản trị bệnh viện, tài chính y tế,..)', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30302', 'Chính sách và dịch vụ y tế', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30303', 'Điều dưỡng', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30304', 'Dinh dưỡng; Khoa học về ăn kiêng', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30305', 'Y tế môi trường và công cộng', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30306', 'Y học nhiệt đới', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30307', 'Ký sinh trùng học', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30308', 'Bệnh truyền nhiễm', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30309', 'Dịch tễ học', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30310', 'Sức khoẻ nghề nghiệp; tâm lý ung thư học, Hiệu quả chính sách và xã hội của nghiên cứu y sinh học', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30312', 'Sức khoẻ sinh sản', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30313', 'Đạo đức học trong y học', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30314', 'Lạm dụng thuốc; Nghiện và cai nghiện.', '303');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30399', 'Các vấn đề y tế khác', '303');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30401', 'Dược lý học', '304');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30402', 'Dược học lâm sàng và điều trị', '304');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30403', 'Dược liệu học; Cây thuốc; Con thuốc; Thuốc Nam, thuốc dân tộc', '304');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30404', 'Hoá dược học', '304');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30405', 'Kiểm nghiệm thuốc và độc chất học', '304');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30499', 'Dược học khác', '304');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30501', 'Công nghệ sinh học liên quan đến y học, y tế', '305');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30502', 'Công nghệ sinh học liên quan đến thao tác với các tế bào, mô, cơ quan hay toàn bộ sinh vật (hỗ trợ sinh sản); công nghệ tế bào gốc', '305');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30503', 'Công nghệ liên quan đến xác định chức năng của ADN, protein, enzym và tác động của chúng tới việc phát bệnh; đảm bảo sức khỏe (bao gồm cả chẩn đoán gen, các can thiệp điều trị trên cơ sở gen (dược phẩm trên cơ sở gen (pharmacogenomics) các liệu pháp điều trị trên cở sở gen),...', '305');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30504', 'Vật liệu sinh học liên quan đến cấy ghép trong y học, thiết bị, cảm biến y học)', '305');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30505', 'Đạo đức học trong công nghệ sinh học y học', '305');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('30599', 'Công nghệ sinh học y học khác', '305');

INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('39901', 'Pháp y', '399');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('39902', 'Y học thảm hoạ', '399');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('39903', 'Y học hàng không, vũ trụ', '399');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('39904', 'Quân y; Y tế quốc phòng', '399');
INSERT INTO `field` (`id`, `name`, `child_of_field_id`) VALUES ('39999', 'Y học, y tế và dược chưa xếp vào mục nào khác', '399');


INSERT INTO `role_of_group` (`id`, `code`, `name`) VALUES ('101', 'TN', 'Trưởng Nhóm');
INSERT INTO `role_of_group` (`id`, `code`, `name`) VALUES ('102', 'TV', 'Thành Viên');

INSERT INTO `user_profile` (`id`, `is_deleted`, `full_name`, `email`, `is_enabled`, `is_locked`,`username`, `password`, `domain_id`, `role_id`) VALUES ('1', b'0', 'SUPER ADMIN', 'notificationmarketplace@gmail.com', b'1', b'0','superadmin','$2a$12$QVX8aAVdBK71K.IOmNiihOOYm83i7vJs2msVRqBkbTsLijqe.T4hO', 101, 101);

