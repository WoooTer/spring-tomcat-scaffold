package wooter.spring.mongo;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSFile;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import wooter.pojo.Person;
import wooter.spring.config.MyMongoConfig;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {MyMongoConfig.class})
public class MongoTest {

    @Autowired
    MongoTemplate mongoTemplate;
    @Autowired
    GridFsTemplate gridFsTemplate;

    @Test
    public void test(){
        Person p = new Person();
        p.setName("wooter");
        p.setAge(18);
        mongoTemplate.insert(p);
    }

    @Test
    public void gridFsStore() throws Exception{
        InputStream inputStream = new FileInputStream("C:/Users/taota/Desktop/截图/0dfd78310a55b3195e4222654ca98226cffc1721.gif");
        DBObject metaData = new BasicDBObject();
        metaData.put("user", "alex");
        gridFsTemplate.store(inputStream, "test.gif", "image/gif", metaData).toString();
    }

    @Test
    public void gridFsFind() throws Exception{
        String id = "5dc514dd4300250f91243183";
        Query q = query(where("_id").is(id));
        GridFSDBFile gridFsFile = gridFsTemplate.findOne(q);
        gridFsFile.getInputStream();
        writeToLocal("C:/Users/taota/Desktop/mytest.gif", gridFsFile.getInputStream());
    }


    /**
     * 将InputStream写入本地文件
     * @param destination 写入本地目录
     * @param input	输入流
     * @throws IOException
     */
    private static void writeToLocal(String destination, InputStream input)
            throws IOException {
        int index;
        byte[] bytes = new byte[1024];
        FileOutputStream downloadFile = new FileOutputStream(destination);
        while ((index = input.read(bytes)) != -1) {
            downloadFile.write(bytes, 0, index);
            downloadFile.flush();
        }
        downloadFile.close();
        input.close();
    }

}
