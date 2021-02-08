package com.ssafy.bab.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.bab.dto.ContributionOld;

@Repository
public interface ContributionOldDao extends JpaRepository<ContributionOld, Integer> {

}
