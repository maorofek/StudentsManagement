package studentsManagement.dal;

import org.springframework.data.repository.CrudRepository;

public interface StudentDao extends CrudRepository<Student, Integer> {

}
