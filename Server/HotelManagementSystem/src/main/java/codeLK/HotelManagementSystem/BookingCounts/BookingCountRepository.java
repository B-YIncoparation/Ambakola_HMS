package codeLK.HotelManagementSystem.BookingCounts;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingCountRepository extends MongoRepository<BookingCounts, ObjectId>
{
    Optional<BookingCounts> findByCounterId(String counterId);
    List<BookingCounts> findByCount(Integer count);
    List<BookingCounts> findBydateBetween(Date startDate, Date endDate);

}
