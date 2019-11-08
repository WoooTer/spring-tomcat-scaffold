package wooter.spring.config;

import com.mongodb.Mongo;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.authentication.UserCredentials;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

@Configuration
public class MyMongoConfig extends AbstractMongoConfiguration {

    @Override
    protected String getDatabaseName() {
        return "his";
    }

    @Override
    public Mongo mongo() throws Exception {
        return new Mongo("localhost", 27017);
    }

    protected UserCredentials getUserCredentials() {
        return new UserCredentials("his", "xxxxxx");
    }

    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate(mongoDbFactory());
    }

    @Bean
    public GridFsTemplate gridFsTemplate() throws Exception{
        return new GridFsTemplate(mongoDbFactory(), mappingMongoConverter());
    }

}
