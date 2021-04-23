package wooter.servlet;

import com.mongodb.gridfs.GridFSDBFile;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import wooter.spring.utils.SpringHelper;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@WebServlet(urlPatterns = "/MyGridfsServlet")
public class MyGridfsServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 设置响应内容类型
        response.setContentType("application/pdf");

        // 实际的逻辑是在这里
        ServletOutputStream out = response.getOutputStream();

        GridFsTemplate gridFsTemplate = SpringHelper.getBean(GridFsTemplate.class);
        String id = "605d73eb6bbd088b62c18ee7";
        Query q = query(where("_id").is(id));
        GridFSDBFile gridFsFile = gridFsTemplate.findOne(q);
        InputStream is = gridFsFile.getInputStream();

        out.write(toByteArray(is));
        out.flush();

    }

    public byte[] toByteArray(InputStream input) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len;
        try {
            while ((len = input.read(buffer)) > -1) {
                baos.write(buffer, 0, len);
            }
            baos.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                input.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return baos.toByteArray();
    }

    public InputStream toInputStream(byte[] bytes) {
        return new ByteArrayInputStream(bytes);
    }
}
