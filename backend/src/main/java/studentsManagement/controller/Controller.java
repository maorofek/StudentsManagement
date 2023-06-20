package studentsManagement.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import studentsManagement.dal.Student;
import studentsManagement.service.JpaService;

import java.util.List;

@RestController
public class Controller {

    Logger logger = LoggerFactory.getLogger(Controller.class);
    public static final String BASE_URL = "/studentsManagement";
    public static final String APPLICATION_JSON_VALUE = "application/json";


    private final JpaService jpaService;

    @Autowired
    public Controller(JpaService jpaService) {
        this.jpaService = jpaService;
    }

    @RequestMapping(
            method = RequestMethod.GET,
            path = BASE_URL + "/getStudents",
            produces = APPLICATION_JSON_VALUE
    )
    public List<Student> getStudents() {
        return jpaService.getAllStudents();
    }

    @RequestMapping(
            method = RequestMethod.POST,
            path = BASE_URL + "/insertStudent",
            produces = APPLICATION_JSON_VALUE
    )
    public boolean insertStudent(@RequestBody Student student) {
        return jpaService.insertStudent(student);
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            path = BASE_URL + "/updateStudent",
            produces = APPLICATION_JSON_VALUE,
            consumes = APPLICATION_JSON_VALUE
    )
    public Student updateStudent(@RequestBody Student student) {
        return jpaService.updateStudent(student);
    }
}
