package codeLK.HotelManagementSystem.Payments;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface PaymentRepository extends MongoRepository<Payments, ObjectId> {

    List<Payments> findBydateBetween(Date startDate, Date endDate);


}

